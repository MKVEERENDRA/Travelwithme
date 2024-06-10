'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, notification, Row, Col, Card } from 'antd'
import {
  BellOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [destinations, setDestinations] = useState<Model.Destination[]>([])
  const [companions, setCompanions] = useState<Model.Companion[]>([])
  const [notifications, setNotifications] = useState<Model.Notification[]>([])

  useEffect(() => {
    if (userId) {
      Api.Destination.findMany()
        .then(setDestinations)
        .catch(err =>
          enqueueSnackbar('Failed to fetch destinations', { variant: 'error' }),
        )
      Api.Companion.findMany({ filters: { userId } })
        .then(setCompanions)
        .catch(err =>
          enqueueSnackbar('Failed to fetch companions', { variant: 'error' }),
        )
      Api.Notification.findManyByUserId(userId, { includes: ['user'] })
        .then(setNotifications)
        .catch(err =>
          enqueueSnackbar('Failed to fetch notifications', {
            variant: 'error',
          }),
        )
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Welcome to Your Travel Dashboard</Title>
      <Paragraph>
        Here you can find recommended destinations, view your travel companions,
        and stay updated with notifications.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <EnvironmentOutlined /> Recommended Destinations
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={destinations}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<EnvironmentOutlined />} />}
                    title={item.name}
                    description={`${item.city}, ${item.country}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <TeamOutlined /> Travel Companions
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={companions}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<TeamOutlined />} />}
                    title={`Companion ID: ${item.companionId}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            title={
              <>
                <BellOutlined /> Notifications
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BellOutlined />} />}
                    title={item.title}
                    description={item.message}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
