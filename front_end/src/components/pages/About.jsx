const About = function () {
	return (
		<section className="container">
			<p>
				This is a simple application for the registration of insured persons and management of insurance data. It allows you to add new insured
				persons, edit their data, and delete them.
				<br />
				The app is created using React js, Node.js, Express.js. The data is stored in a MongoDB database. Profile images of insured persons are
				stored on the server.
				<br />
				The app is secured with a login system.
				<br />
				There are two roles: admin and employee. The admin can register a new user, edit their roles, and delete them.
				<br />
				The employee can add new insured persons, edit their data, and delete them.
				<br />
				The app is created as a project for the ITnetwork course and developed by Udych Yaroslav.
			</p>
		</section>
	)
}

export default About
