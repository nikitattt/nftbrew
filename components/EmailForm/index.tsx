import clsx from 'clsx'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { upsertUserData } from '../../data/user'
import Button, { ButtonType } from '../Button'

const EmailForm = ({
  email,
  receiveReports
}: {
  email: string
  receiveReports: boolean
}) => {
  const [emailValue, setEmailValue] = useState(email ?? '')
  const [notValidEmail, setNotValidEmail] = useState(false)
  const [inUpdate, setInUpdate] = useState(false)

  const handleEmail = async () => {
    if (validEmail(emailValue) && email !== emailValue) {
      var data: any
      if (email) {
        data = { email: emailValue }
      } else {
        data = { email: emailValue, receiveReports: true }
      }
      setInUpdate(true)
      setNotValidEmail(false)
      const done = await upsertUserData(data)
      if (done) {
        toast.success('Saved Email!')
      } else {
        toast.error("Couldn't Save Email :(")
      }
      setInUpdate(false)
    } else {
      setNotValidEmail(true)
    }
  }

  const handleReceiveReports = async () => {
    if (receiveReports !== undefined) {
      setInUpdate(true)
      const done = await upsertUserData({ receiveReports: !receiveReports })
      if (done) {
        if (!receiveReports) {
          toast.success('Saved! NFT Brew Coming!')
        } else {
          toast.success('Done. Sad to See You Go :(')
        }
      } else {
        toast.error("Couldn't Save It :(")
      }
      setInUpdate(false)
    }
  }

  return (
    <div className="mt-20 max-w-lg mx-auto">
      <div className="text-center">
        <p className="font-black text-2xl">Your Email</p>
      </div>
      <input
        type="email"
        value={emailValue}
        placeholder="Your Email"
        onChange={(e) => setEmailValue(e.target.value)}
        className={clsx(
          'mt-4 h-12 w-full font-black text-xl pt-px px-4 rounded-2xl',
          'bg-white bg-opacity-60 caret-grey-dark text-grey-dark outline-grey',
          'placeholder:text-grey-light'
        )}
      />
      {notValidEmail && (
        <p className="mt-2 font-black text-lg text-red text-center px-4">
          Your email is not right or haven't changed
        </p>
      )}
      <div className="mt-4">
        <Button
          text={email ? 'Update It' : 'Save It'}
          onClick={() => !inUpdate && handleEmail()}
          type={ButtonType.main}
          expanded={true}
        />
      </div>
      {email && (
        <div className="mt-4">
          <Button
            text={receiveReports ? 'Stop receiving emails' : 'Receive reports'}
            onClick={() => !inUpdate && handleReceiveReports()}
            type={ButtonType.secondary}
            expanded={true}
          />
        </div>
      )}
    </div>
  )
}

export default EmailForm

function validEmail(email: string) {
  const regularExpression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regularExpression.test(String(email).toLowerCase())
}
