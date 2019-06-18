import React from 'react';

import data from 'data';
import './ListView.css';

class ListView extends React.Component {

	constructor(props) {
		super(props);
  }

	render() {
  	return (
  		<div className='list-view'>
        {
          data.map((item, index) => {
            return (
              <div 
                className='controller-list-item'
                key={index}>
                {item.name}
              </div>
            );
          })
        }
 		 </div>
  	);
	}
}

export default ListView;
