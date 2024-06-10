'use client'

import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

export default function SafetyPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  return <PageLayout layout="narrow">Content Here</PageLayout>
}
