import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams, Redirect } from 'react-router-dom'

import UserForm from '../components/UserForm'

import { usersCrud } from '../api'

const fetchUser = async ({ queryKey }) => {
  const [_key, { id }] = queryKey

  return usersCrud.find(id)
}

function EditUser() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data, error, isLoading, isError } = useQuery(
    ['users', { id }],
    fetchUser
  )

  const mutation = useMutation(usersCrud.update)

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  }

  if (isSuccess) {
    queryClient.invalidateQueries('users')
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2>Edit User</h2>
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {data && (
          <UserForm user={data} submitText="Update" submitAction={onSubmit} />
        )}
      </div>
    </div>
  )
}

export default EditUser
