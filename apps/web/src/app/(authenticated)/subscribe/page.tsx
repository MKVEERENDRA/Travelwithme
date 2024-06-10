'use client'

import { useState } from 'react'
import { Typography, Button, Row, Col, Card } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProsubscriptionPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      return
    }

    setLoading(true)
    try {
      const values = {
        userId,
        startDate: new Date().toISOString(),
        endDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1),
        ).toISOString(),
        isActive: true,
      }
      await Api.Subscription.createOne(values)
      enqueueSnackbar('Subscription successful', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Subscription failed', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Col span={24}>
          <Title level={2}>Pro Subscription</Title>
          <Paragraph>
            Subscribe for 300 rupees and enjoy exclusive benefits!
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card>
            <Title level={3}>Subscription Benefits</Title>
            <Paragraph>
              <CheckCircleOutlined
                style={{ color: 'green', marginRight: '8px' }}
              />
              Unlimited matching and recommendations
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined
                style={{ color: 'green', marginRight: '8px' }}
              />
              Special badge
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined
                style={{ color: 'green', marginRight: '8px' }}
              />
              Only 300 rupees
            </Paragraph>
            <Button type="primary" loading={loading} onClick={handleSubscribe}>
              Subscribe Now
            </Button>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
