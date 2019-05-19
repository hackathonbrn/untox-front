import React, { Component } from 'react';
import { TweenMax } from 'gsap'

class Loading extends Component {
    constructor() {
        super();
        this.svg = React.createRef()
    }

    componentDidMount() {
        if (this.svg.current) {
            var tl = new TimelineMax({repeat: -1})
            var tl2 = new TimelineMax({repeat: -1})
            var tl3 = new TimelineMax({repeat: -1})
            tl.to(this.svg.current, 1, {width: '114'}).to(this.svg.current, 1, {width: '70'})
            tl2.to(this.svg.current.querySelector('#border'), 1, {fill: 'rgba(0,0,0,1)'}).to(this.svg.current.querySelector('#border'), 1, {fill: 'rgba(0,0,0,0)'})
            tl3.to(this.svg.current.querySelector('#bodysvg'), 1, {fill: 'rgba(254,0,0,0)'}).to(this.svg.current.querySelector('#bodysvg'), 1, {fill: 'rgba(254,0,0,1)'})
        }
    }

    render() {
        return (
            <div className='loading'>
                <svg ref={this.svg} width='70' viewBox='0 0 114 105' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <mask id='path-1-inside-1' fill='white'>
                        <path fillRule='evenodd' clipRule='evenodd' d='M18.8938 0.101562H94.4699V9.79654H103.468V20.3728H113.364V74.1355H103.468V83.8304H94.4703V104.102H77.3757V83.8304H65.6788V104.102H48.5842V83.8304H35.9884V104.102H18.8938V83.8304H9.89704V74.1355H0V20.3728H9.89704V9.79654H18.8938V0.101562Z'/>
                    </mask>
                    <path id='bodysvg' fillRule='evenodd' clipRule='evenodd' d='M18.8938 0.101562H94.4699V9.79654H103.468V20.3728H113.364V74.1355H103.468V83.8304H94.4703V104.102H77.3757V83.8304H65.6788V104.102H48.5842V83.8304H35.9884V104.102H18.8938V83.8304H9.89704V74.1355H0V20.3728H9.89704V9.79654H18.8938V0.101562Z' fill='rgba(254, 0, 0, 1)'/>
                    <path id='border' d='M94.4699 0.101562H98.4699V-3.89844H94.4699V0.101562ZM18.8938 0.101562V-3.89844H14.8938V0.101562H18.8938ZM94.4699 9.79654H90.4699V13.7965H94.4699V9.79654ZM103.468 9.79654H107.468V5.79654H103.468V9.79654ZM103.468 20.3728H99.4675V24.3728H103.468V20.3728ZM113.364 20.3728H117.364V16.3728H113.364V20.3728ZM113.364 74.1355V78.1355H117.364V74.1355H113.364ZM103.468 74.1355V70.1355H99.4675V74.1355H103.468ZM103.468 83.8304V87.8304H107.468V83.8304H103.468ZM94.4703 83.8304V79.8304H90.4703V83.8304H94.4703ZM94.4703 104.102V108.102H98.4703V104.102H94.4703ZM77.3757 104.102H73.3757V108.102H77.3757V104.102ZM77.3757 83.8304H81.3757V79.8304H77.3757V83.8304ZM65.6788 83.8304V79.8304H61.6788V83.8304H65.6788ZM65.6788 104.102V108.102H69.6788V104.102H65.6788ZM48.5842 104.102H44.5842V108.102H48.5842V104.102ZM48.5842 83.8304H52.5842V79.8304H48.5842V83.8304ZM35.9884 83.8304V79.8304H31.9884V83.8304H35.9884ZM35.9884 104.102V108.102H39.9884V104.102H35.9884ZM18.8938 104.102H14.8938V108.102H18.8938V104.102ZM18.8938 83.8304H22.8938V79.8304H18.8938V83.8304ZM9.89704 83.8304H5.89704V87.8304H9.89704V83.8304ZM9.89704 74.1355H13.897V70.1355H9.89704V74.1355ZM0 74.1355H-4V78.1355H0V74.1355ZM0 20.3728V16.3728H-4V20.3728H0ZM9.89704 20.3728V24.3728H13.897V20.3728H9.89704ZM9.89704 9.79654V5.79654H5.89704V9.79654H9.89704ZM18.8938 9.79654V13.7965H22.8938V9.79654H18.8938ZM94.4699 -3.89844H18.8938V4.10156H94.4699V-3.89844ZM98.4699 9.79654V0.101562H90.4699V9.79654H98.4699ZM103.468 5.79654H94.4699V13.7965H103.468V5.79654ZM107.468 20.3728V9.79654H99.4675V20.3728H107.468ZM113.364 16.3728H103.468V24.3728H113.364V16.3728ZM117.364 74.1355V20.3728H109.364V74.1355H117.364ZM103.468 78.1355H113.364V70.1355H103.468V78.1355ZM107.468 83.8304V74.1355H99.4675V83.8304H107.468ZM94.4703 87.8304H103.468V79.8304H94.4703V87.8304ZM98.4703 104.102V83.8304H90.4703V104.102H98.4703ZM77.3757 108.102H94.4703V100.102H77.3757V108.102ZM73.3757 83.8304V104.102H81.3757V83.8304H73.3757ZM65.6788 87.8304H77.3757V79.8304H65.6788V87.8304ZM61.6788 83.8304V104.102H69.6788V83.8304H61.6788ZM65.6788 100.102H48.5842V108.102H65.6788V100.102ZM52.5842 104.102V83.8304H44.5842V104.102H52.5842ZM35.9884 87.8304H48.5842V79.8304H35.9884V87.8304ZM39.9884 104.102V83.8304H31.9884V104.102H39.9884ZM18.8938 108.102H35.9884V100.102H18.8938V108.102ZM14.8938 83.8304V104.102H22.8938V83.8304H14.8938ZM9.89704 87.8304H18.8938V79.8304H9.89704V87.8304ZM5.89704 74.1355V83.8304H13.897V74.1355H5.89704ZM0 78.1355H9.89704V70.1355H0V78.1355ZM-4 20.3728V74.1355H4V20.3728H-4ZM9.89704 16.3728H0V24.3728H9.89704V16.3728ZM5.89704 9.79654V20.3728H13.897V9.79654H5.89704ZM18.8938 5.79654H9.89704V13.7965H18.8938V5.79654ZM14.8938 0.101562V9.79654H22.8938V0.101562H14.8938Z' fill='rgba(0,0,0,0)' mask='url(#path-1-inside-1)'/>
                </svg>
            </div>
        )
    }
}

export default Loading