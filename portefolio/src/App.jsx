import React from 'react';
import './App.css';

function App() {
	return (
		<div className='app-container'>
			<header className='comic-box header'>
				<h2>João Tavares</h2>
				<ul className='nav-links'>
					<li>
						<a href='#about'>About</a>
					</li>
					<li>
						<a href='#skills'>Skills</a>
					</li>
					<li>
						<a href='#projects'>Projects</a>
					</li>
					<li>
						<a href='#contact'>Contact</a>
					</li>
				</ul>
			</header>

			<main>
				<section id='about' className='comic-box hero'>
					<h1>
						Hello, I'm <span className='highlight'>João</span>
					</h1>
					<p className='hero-text'>Web Developer | Front-end & Back-end</p>
					<div style={{ marginTop: '20px', textAlign: 'left', backgroundColor: '#ffffff', color: '#000000', padding: '15px', border: '4px solid #000000', fontWeight: '900' }}>
						<p>I am a Computer Engineering student based in Portugal with a strong passion for software programming and digital systems.</p>
						<p style={{ marginTop: '10px' }}>
							My journey in technology involves building efficient applications, ranging from object-oriented architectures to modern full-stack web platforms. I care about the details: performance,
							accessibility, and code that others can maintain. I'm always looking for the next challenge to solve and the next tool worth learning.
						</p>
					</div>
				</section>

				<section id='skills' className='comic-box'>
					<h2 className='section-title'>My Powers</h2>
					<div className='skills-grid'>
						<div className='skill-card'>
							<img src='/logos/html.png' alt='HTML' />
							<p>HTML</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/css-3.png' alt='CSS' />
							<p>CSS</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/javascript.png' alt='JavaScript' />
							<p>JavaScript</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/react.png' alt='React' />
							<p>React</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/nodejs.png' alt='Node.js' />
							<p>Node.js</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/mongodb.png' alt='MongoDB' />
							<p>MongoDB</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/mysql.png' alt='MySQL' />
							<p>MySQL</p>
						</div>
						<div className='skill-card'>
							<img src='/logos/git.png' alt='Git' />
							<p>Git</p>
						</div>
					</div>
				</section>

				<section id='projects' className='comic-box'>
					<h2 className='section-title'>Heroic Missions</h2>
					<div className='projects-grid'>
						<div className='project-card'>
							<img src='/projects/cookieeater.png' alt='Cities App' />
							<h3>Cookie Eater</h3>
							<p>A browser extension built to manage and automate the removal of tracking cookies, enhancing user privacy and web navigation. </p>
							<a href='https://github.com/j0aot/Cookie-Eater' target='_blank' rel='noreferrer' className='btn'>
								View Mission
							</a>
						</div>
						<div className='project-card'>
							<img src='/projects/everythingpdf.png' alt='Expense Tracker' />
							<h3>EverythingPDF</h3>
							<p>An all-in-one document manipulation tool developed to process, merge, split, and optimize PDF files efficiently. </p>
							<a href='https://github.com/j0aot/everythingpdf' target='_blank' rel='noreferrer' className='btn'>
								View Mission
							</a>
						</div>
						<div className='project-card'>
							<img src='/projects/imagedupe.png' alt='To-do List' />
							<h3>ImageDupe</h3>
							<p>A high performance image deduplication tool that identifies and removes duplicate visual files through hash-based comparison. </p>
							<a href='https://github.com/j0aot/imagedupe' target='_blank' rel='noreferrer' className='btn'>
								View Mission
							</a>
						</div>
					</div>
				</section>

				<section id='contact' className='comic-box'>
					<h2 className='section-title'>Comm Link</h2>
					<p style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '20px' }}>Ready for a new adventure? Send a signal!</p>
					<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
						<a href='mailto:10gabriel.tavares@gmail.com' className='btn'>
							Email Me
						</a>
						<a href='https://github.com/j0aot' target='_blank' rel='noreferrer' className='btn'>
							GitHub
						</a>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
