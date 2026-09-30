import React from 'react'
import PageHero from '../components/PageHero'
import StickyStack from '../components/StickyStack'
import { products } from '../data/products'

export default function About() {
  const cards = [
    {kicker:'THE AGENCY',title:'Built around',accent:'trust.',label:'AUTHORISED DEALER',text:'Thirupathi Agency connects recognised consumer brands with retailers and business customers through a simple, dependable distribution experience.',image:products[0].image},
    {kicker:'THE PORTFOLIO',title:'From pantry',accent:'to home.',label:'MULTI-CATEGORY',text:'Our portfolio spans food, masalas, ghee, beverage mixes, home care and everyday essentials — giving trade customers one place to discover multiple categories.',image:products[1].image},
    {kicker:'THE PROMISE',title:'Every delivery',accent:'matters.',label:'RELIABLE SUPPLY',text:'The website is designed around clarity: what we distribute, why retailers can work with us, and how to reach the team quickly.',image:products[4].image},
  ]
  return <><PageHero eyebrow="ABOUT THIRUPATHI AGENCY" title="A distribution story" accent="with purpose." text="A warm, contemporary identity inspired by the heritage-led visual language of RKG while keeping Thirupathi Agency’s own voice and portfolio at the centre." image={products[2].image}/><StickyStack items={cards}/><section className="story-callout"><p className="eyebrow">OUR APPROACH</p><h2>Professional on the shelf.<br/><i>Personal in service.</i></h2></section></>
}
