'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
} from 'antd'
import {
  SearchOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function JourneyPlanningPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [destinations, setDestinations] = useState<Model.Destination[]>([])
  const [journey, setJourney] = useState<Partial<Model.Journey>>({})

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsFound = await Api.Destination.findMany()
        setDestinations(destinationsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch destinations', { variant: 'error' })
      }
    }
    fetchDestinations()
  }, [])

  const handleFormSubmit = async (values: any) => {
    const { destinationId, dates, preferences } = values
    const [startDate, endDate] = dates

    const journeyData: Partial<Model.Journey> = {
      userId,
      destinationId,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
      preferences,
    }

    try {
      if (journey.id) {
        await Api.Journey.updateOne(journey.id, journeyData)
        enqueueSnackbar('Journey updated successfully', { variant: 'success' })
      } else {
        await Api.Journey.createOne(journeyData)
        enqueueSnackbar('Journey created successfully', { variant: 'success' })
      }
      router.push('/matches')
    } catch (error) {
      enqueueSnackbar('Failed to save journey', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Plan Your Journey</Title>
      <Text>
        Input your destination, travel dates, and preferences to receive
        tailored recommendations.
      </Text>
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          destinationId: journey.destinationId,
          dates:
            journey.startDate && journey.endDate
              ? [dayjs(journey.startDate), dayjs(journey.endDate)]
              : [],
          preferences: journey.preferences,
        }}
      >
        <Form.Item
          name="destinationId"
          label="Destination"
          rules={[{ required: true, message: 'Please select a destination' }]}
        >
          <Select
            placeholder="Select a destination"
            suffixIcon={<SearchOutlined />}
          >
            {destinations?.map(destination => (
              <Option key={destination.id} value={destination.id}>
                {destination.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dates"
          label="Travel Dates"
          rules={[{ required: true, message: 'Please select travel dates' }]}
        >
          <RangePicker suffixIcon={<CalendarOutlined />} />
        </Form.Item>
        <Form.Item name="preferences" label="Preferences">
          <Input.TextArea placeholder="Enter your travel preferences" />
        </Form.Item>
        <Form.Item>
          <Row justify="center">
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
