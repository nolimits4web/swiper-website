import { ReactComponent as GithubLogo } from '@/img/github.svg';
import { useEffect, useState } from 'react';

function getLocalStats() {
  return {
    stars: localStorage.getItem('swiper-git-stats-stars'),
    forks: localStorage.getItem('swiper-git-stats-forks'),
  };
}

async function fetchGitStats(local) {
  if (local) {
    return getLocalStats();
  }
  const res = await fetch('https://api.github.com/repos/nolimits4web/swiper');
  const { stargazers_count, forks } = await res.json();
  if (stargazers_count || forks) {
    localStorage.setItem('swiper-git-stats-date', new Date().getTime());
  }
  if (stargazers_count) {
    localStorage.setItem(
      'swiper-git-stats-stars',
      stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  return getLocalStats();
}

export default function GithubStats(props) {
  const { white, className, responsive } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const gitStatsDate = localStorage.getItem('swiper-git-stats-date');
    const local =
      gitStatsDate && new Date().getTime() - gitStatsDate * 1 < 1000 * 60 * 60;
    fetchGitStats(local).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div className={`${className || ''}`}>
      <a
        className={`flex items-center text-xs text-black hover:!text-primary hover:no-underline dark:text-white`}
        href="https://github.com/nolimits4web/swiper"
        rel="noopener"
        target="_blank"
      >
        <GithubLogo height="20" className="mr-1" />
        <span
          className={`flex items-end leading-[1] ${
            responsive ? 'hidden md:inline' : ''
          }`}
        >
          <span className={`mr-1 text-sm font-medium leading-[1]`}>
            {data.stars}
          </span>{' '}
          <span className={`leading-[1]`}>stars</span>
        </span>
      </a>
    </div>
  );
}
