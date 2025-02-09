import React from "react"
import SbEditable from "storyblok-react"
import { render } from "storyblok-rich-text-react-renderer"
import styles from "../styles/NewsItem.module.scss"
import SmallCardList from "./SmallCardList"
import { FacebookShareButton, FacebookIcon,TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';



const NewsItem = ({ data, level }) => {
  var movies = [];
  var personalities = [];
  //enriching data
  if (level === 'data') {
    var content = data.story.content;
    movies = data.rels.filter(obj => {
      return content.movies.includes(obj.uuid);
    });
    personalities = data.rels.filter(obj => {
      return content.personalities.includes(obj.uuid);
    });
  } else {
    var content = data;
  }
  //returning the HTML
  return (
    <SbEditable content={content} key={content._uid}>
      <main>
        {/* <div className={[styles.movie, styles.test].join(' ')}> */}
        <div className={styles.newsitem}>
          <h1 className={styles.title}>
            {content.title}
          </h1>
          <div className="sharebar">
            <FacebookShareButton url={"https://belgiumbyguide.vercel.app/"+data.story.full_slug} quote={content.short} hashtag={'#BelgiumByGuide'}><FacebookIcon size={32} round /></FacebookShareButton>
            <LinkedinShareButton url={"https://belgiumbyguide.vercel.app/"+data.story.full_slug} summary={content.short}><LinkedinIcon size={32} round /></LinkedinShareButton>
            <TwitterShareButton url={"https://belgiumbyguide.vercel.app/"+data.story.full_slug} title={content.title}><TwitterIcon size={32} round /></TwitterShareButton>
          </div>
          <div className={styles.mainpicture} style={{ backgroundImage: `url("${content.mainpicture.filename}")` }}>
          </div>
          <div className={styles.short}>
            {render(content.short)}
          </div>
          <div className={styles.article}>
            {render(content.article)}
          </div>
          {movies && movies.length > 0 && <SmallCardList items={movies} title="Related cities" type="movie"></SmallCardList>}
          {personalities && personalities.length > 0 && <SmallCardList items={personalities} title="Related personalities" type="personality"></SmallCardList>}
      
        </div>
      </main>
    </SbEditable>
  )
}

export default NewsItem
