import React from 'react';
import './components/styles.css';

const CommunityAuthor = ({name, imageUrl, twitterUrl, githubUrl, description}) => {
    return(
        <>
        	<h2 className="communitySection">About the community author</h2>
        	<div className="authorSection">
        		<div className="authorImg">
        			<img src={imageUrl} alt={name} />
        		</div>
        		<div className="authorDetails">
	        		<div className="authorName">
	        			<strong>{name}</strong>
	        		</div>
	        		<div className="authorDesc">
                        {description}
	        		</div>
        		</div>
        	</div>
        </>
    )
};

export default CommunityAuthor;
