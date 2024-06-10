'use client'

import { useEffect, useState } from 'react'
import { Input, Button, List, Typography, Row, Col } from 'antd'
import { SendOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MessagingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [matches, setMatches] = useState<Model.Match[]>([])
  const [selectedMatch, setSelectedMatch] = useState<Model.Match | null>(null)
  const [messages, setMessages] = useState<Model.Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  useEffect(() => {
    if (userId) {
      Api.Match.findMany({ filters: { userId } })
        .then(setMatches)
        .catch(() =>
          enqueueSnackbar('Failed to load matches', { variant: 'error' }),
        )
    }
  }, [userId])

  useEffect(() => {
    if (selectedMatch) {
      Api.Message.findMany({
        filters: { receiverId: selectedMatch.matchedUserId, senderId: userId },
      })
        .then(setMessages)
        .catch(() =>
          enqueueSnackbar('Failed to load messages', { variant: 'error' }),
        )
    }
  }, [selectedMatch, userId])

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedMatch) {
      try {
        const message = await Api.Message.createOne({
          senderId: userId,
          receiverId: selectedMatch.matchedUserId,
          content: newMessage,
          timestamp: dayjs().toISOString(),
        })
        setMessages([...messages, message])
        setNewMessage('')
      } catch {
        enqueueSnackbar('Failed to send message', { variant: 'error' })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Messaging</Title>
      <Text>
        Chat with your matched travel companions to plan activities and
        coordinate meetups.
      </Text>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col xs={24} md={8}>
          <List
            header={<div>Your Matches</div>}
            bordered
            dataSource={matches}
            renderItem={match => (
              <List.Item
                onClick={() => setSelectedMatch(match)}
                style={{ cursor: 'pointer' }}
              >
                {match.matchedUserId}
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} md={16}>
          {selectedMatch && (
            <>
              <List
                header={<div>Messages</div>}
                bordered
                dataSource={messages}
                renderItem={message => (
                  <List.Item>
                    <List.Item.Meta
                      title={message.senderId === userId ? 'You' : 'Companion'}
                      description={message.content}
                    />
                    <div>
                      {dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </List.Item>
                )}
                style={{ marginBottom: 20 }}
              />
              <Input.Group compact>
                <Input
                  style={{ width: 'calc(100% - 50px)' }}
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                />
              </Input.Group>
            </>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
