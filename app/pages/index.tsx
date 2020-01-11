import React, { useState } from 'react'
import Head from 'next/head'
import Footer from '../components/NextStyledFooter'
import { useStateValue } from '../State/globalState'



export default function App() {

	const [{ authUser, authenticating }, dispatch] = useStateValue()

	const [email, setEmail] = useState("")
	const [subscribing, setSubscribing] = useState(false)
	const [emailErrorText, setEmailErrorText] = useState("")
	const [emailStatus, setEmailStatus] = useState("")


	async function addSubscriber() {
		setSubscribing(true)


		const result = await fetch(`https://35xoa0lov9.execute-api.us-east-1.amazonaws.com/dev/addSubscriber/get?email=${email}`)
		const json = await result.json()

		setSubscribing(false)


		if (json.status === "success") {
			setEmailStatus("success")
			setEmailErrorText("Success! Please check your email to confirm signup!")

		}
		else {
			setEmailStatus("error")
			setEmailErrorText(`Error signing up: ${json.message}`)

		}


	}



	return (
		<div>

			<Head>


				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Bullionix</title>
				<meta name="description" content="Equity-free grants for makers and startups" />
				<meta name="keywords" content="Startups,makers,grants,equity-free" />


			</Head>


			<div id="wrapper">


				{/*Footer{*/}
				<div className="margin-top-15"></div>

				<Footer />
				{/*Back to top{*/}
				<div id="backtotop"><a href="#"></a></div>

			</div>
			{/*Wrapper end{*/}</div>

	)

}









