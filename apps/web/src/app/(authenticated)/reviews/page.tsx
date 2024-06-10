'use client'

import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  Avatar,
  Rate,
  Form,
  Input,
  Button,
  Row,
  Col,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ReviewsandRatingsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [reviews, setReviews] = useState<Model.Review[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsFound = await Api.Review.findMany({
          filters: { reviewedUserId: userId },
        })
        setReviews(reviewsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch reviews', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchReviews()
    }
  }, [userId])

  const handleSubmit = async (values: { rating: number; comment: string }) => {
    try {
      const newReview = await Api.Review.createOne({
        reviewerId: userId,
        reviewedUserId: params.id,
        rating: values.rating,
        comment: values.comment,
      })
      setReviews([...reviews, newReview])
      form.resetFields()
      enqueueSnackbar('Review submitted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to submit review', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title level={2}>Reviews and Ratings</Title>
          <Paragraph>
            Provide feedback and help others make informed decisions by rating
            and reviewing your travel companions.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={reviews}
            loading={loading}
            renderItem={review => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<Text strong>{review.comment}</Text>}
                  description={
                    <>
                      <Rate disabled defaultValue={review.rating} />
                      <Text type="secondary" style={{ display: 'block' }}>
                        {dayjs(review.dateCreated).format('MMMM D, YYYY')}
                      </Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: 'Please provide a rating' }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="comment"
              label="Comment"
              rules={[{ required: true, message: 'Please provide a comment' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Review
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
