'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar, Input, Button, Spin } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Meta } = Card
const { Search } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TravelerMatchingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState<Model.User[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (userId) {
      fetchMatches()
    }
  }, [userId])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      const matchData = await Api.Match.findMany({ filters: { userId } })
      const matchedUserIds = matchData.map(
        (match: Model.Match) => match.matchedUserId,
      )
      const users = await Api.User.findMany({
        filters: { id: { in: matchedUserIds } },
      })
      setMatches(users)
    } catch (error) {
      enqueueSnackbar('Failed to fetch matches', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (value: string) => {
    setLoading(true)
    try {
      const users = await Api.User.findMany({
        filters: { name: { ilike: value } },
      })
      setMatches(users)
    } catch (error) {
      enqueueSnackbar('Failed to search travelers', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Traveler Matching</Title>
      <Text>
        Connect with like-minded travelers heading to the same destination and
        foster new friendships.
      </Text>
      <Search
        placeholder="Search travelers"
        enterButton={<Button icon={<SearchOutlined />} />}
        size="large"
        onSearch={handleSearch}
        style={{ margin: '20px 0' }}
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {matches?.map(user => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <Avatar
                    size={128}
                    icon={<UserOutlined />}
                    src={user.pictureUrl}
                  />
                }
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                <Meta title={user.name} description={user.email} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
