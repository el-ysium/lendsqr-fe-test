import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import loginIllustration from '../../assets/login_illustration.svg'
import './LoginPage.scss'

export function LoginPage() {
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    navigate('/users')
  }

  return (
    <div className="login">
      <div className="login__brand">
        <img src={logo} alt="lendsqr" className="login__logo" />
        <img
          src={loginIllustration}
          alt=""
          className="login__illustration"
        />
      </div>

      <div className="login__form-panel">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Welcome!</h1>
          <p className="login__subtitle">Enter details to login.</p>

          <label className="login__field">
            <span className="sr-only">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="login__field login__field--password">
            <span className="sr-only">Password</span>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="login__show"
              onClick={() => setIsPasswordVisible((v) => !v)}
            >
              {isPasswordVisible ? 'HIDE' : 'SHOW'}
            </button>
          </label>

          <a href="#forgot" className="login__forgot">
            FORGOT PASSWORD?
          </a>

          <button type="submit" className="login__submit">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  )
}
