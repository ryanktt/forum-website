import parser, {Tag} from 'bbcode-to-react';
import Iframe from 'react-iframe';
import Parser from 'react-html-parser'
import {TwitterTweetEmbed} from 'react-twitter-embed';
import {getSubstringsBetween} from '../textFormat';

class youtubeTag extends Tag {
    toReact() {
        let url = this.getContent();

        if(!url.includes('https://youtu.be/') && !url.includes('https://www.youtube.com/embed/')) {
            return `[youtube]${this.getContent()}[/youtube]`
        }

        if(url.includes('https://youtu.be/')) {
            url = url.replace('https://youtu.be/', 'https://www.youtube.com/embed/')
        }

        const divStyle = {
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            paddingTop: '56.25%' 
        }

        const iframeStyle = {
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            width: '100%',
            height: '100%',
        }

        const attributes = {
          src: url
        };
        return (
            <div style={{maxWidth: '600px'}}>
                <div style={divStyle}>
                    <iframe
                        style={iframeStyle}
                        {...attributes}
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }
}

class twitterTag extends Tag {
    
    toReact() {

        let url = this.getContent();
        let tweetId = null;

        if(!url.includes('https://twitter.com') || !url.includes('/status/')) {
            return `[twitter]${this.getContent()}[/twitter]`
        }

        tweetId = url.split('/status/')[1];

        if(url.includes('?')) {
            tweetId = getSubstringsBetween(url, '/status/', '?')[0];
        }
        
        return (
            tweetId ? 
            <div style={{display: 'block', maxWidth: '450px'}}><TwitterTweetEmbed tweetId={tweetId} /></div> 
            : null
        );
    }
}

parser.registerTag('twitter', twitterTag);
parser.registerTag('youtube', youtubeTag);

export default parser;