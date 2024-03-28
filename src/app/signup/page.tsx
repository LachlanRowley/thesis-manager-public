'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/SignUp.module.css'

export default function SignUp() {
  const router = useRouter()
  const [firstname, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [uni_id, setUniID] = useState('')


  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = {firstname, lastname, uni_id, email }
      await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles.page}>
        <form onSubmit={submitData}>
          <h1>Signup user</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={firstname}
          />
          <input
            autoFocus
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Name"
            type="text"
            value={lastname}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="text"
            value={email}
          />
          <input
            onChange={(e) => setUniID(e.target.value)}
            placeholder="Email address"
            type="text"
            value={uni_id}
          />
          <input disabled={!firstname || !email} type="submit" value="Signup" />
          <a className={styles.back} href="/">
            or Cancel
          </a>
        </form>
      </div>
    </>
  )
}
