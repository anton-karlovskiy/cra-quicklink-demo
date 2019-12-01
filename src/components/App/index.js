/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ray test touch <
import React, { useEffect, lazy, Suspense } from 'react';
// import Loadable from 'react-loadable';
// ray test touch >

// TODO: use hook instead of withRouter or might not needed at all
import { Route, withRouter } from '@components/Router';
import Footer from '@components/Footer';
import Hero from '@components/Hero';
import style from './index.module.css';

// Route-Split Components
// ray test touch <
// const loading = () => <div>Loading...</div>;
// const load = loader => Loadable({loader, loading});

// const Home = load(() => import('@pages/Home'));
// const About = load(() => import('@pages/About'));
// const Article = load(() => import('@pages/Article'));
// const Blog = load(() => import('@pages/Blog'));

const Home = lazy(() => import(/* webpackChunkName: "home" */ '@pages/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ '@pages/About'));
const Article = lazy(() => import(/* webpackChunkName: "article" */ '@pages/Article'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ '@pages/Blog'));
// ray test touch >

const App = ({ history }) => {
	useEffect(() => {
		// attach route manifest to global
		fetch('/rmanifest.json')
			.then(response => response.json())
			.then(data => {
				window._rmanifest_ = data;
			});

		// TODO: might drop
		if (process.env.NODE_ENV === 'production') {
			history.listen(obj => {
				if (window.ga) window.ga.send('pageview', {dp: obj.pathname});
			});
		}
	// eslint-disable-next-line
	}, []);

	return (
		<div className={style.app}>
			<Hero />
			<main className={style.wrapper}>
				{/* ray test touch < */}
				<Suspense fallback={<div>Loading...</div>}>
					<Route path="/" exact component={Home} />
					<Route path="/blog" exact component={Blog} />
					<Route path="/blog/:title" component={Article} />
					<Route path="/about" exact component={About} />
				</Suspense>
				{/* ray test touch > */}
			</main>
			<Footer />
		</div>
	);
}

export default withRouter(App);
