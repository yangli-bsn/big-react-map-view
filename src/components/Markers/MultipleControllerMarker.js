import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import Tooltip from 'components/Tooltip';

import './Markers.css';

class MultipleControllerMarker extends Component<{}, State> {

  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  handleClick() {
    const clusterId = this.props.clusterData.cluster.properties.cluster_id;
    const superCluster = this.props.clusterData.superCluster;
    // Add 0.1 to make sure the zoom level is high enough to decompose
    const zoomLevel = superCluster.getClusterExpansionZoom(clusterId) + 0.1;

    const cluster = this.props.clusterData.cluster;

    const lng = cluster.geometry.coordinates[0];
    const lat = cluster.geometry.coordinates[1];

    this.props.changeViewport({zoom: zoomLevel, longitude: lng, latitude: lat });
  }

  render() {
    let { controllerData, clusterChildren } = this.props;

  	let errors = 0
    let warnings = 0;
    let number = 0;

    clusterChildren.forEach((child, index) => {
      let controller = controllerData[child.properties.key];
      if (controller.errors > errors) {
        errors = controller.errors;
      }
      if (controller.warnings > warnings) {
        warnings = controller.warnings;
      }
    });

  	let color = '';

  	if (errors > 0) {
  		color = '#F41919';
      number = errors;
  	}
  	else if (warnings > 0) {
  		color = '#EEDF18';
      number = warnings;
  	}
  	else {
  		color = '#34E817';
      number = 0;
  	}

  	return (
  		<div className='multiple-controller'
            data-tip='hello world'
            style={{backgroundColor: color}}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
  		  {number}
        <Tooltip active={this.state.hover} />
  		</div>
  	);
  }
}

export default MultipleControllerMarker;