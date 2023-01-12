import Blurb from './Blurb'
import Footer from './footer'
import Header from './Header'
import Hero from './Hero'
import Stats from './Stats'
// import Footer from './footer'

export default function Home({ numCancelled }) {
	return (
		<>
			<Header />

			<Hero />
			<Stats from={0} to={numCancelled} />
			<Blurb />
			<Footer />
		</>
	)
}
