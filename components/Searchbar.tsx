'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if(hostname.includes('amazon.in')|| hostname.includes('amazon.')||hostname.endsWith('amzon')){
      return true;
    }}
  catch(error){
    return false;
  } 
  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isValidLink = isValidAmazonProductURL(searchPrompt);

      if(!isValidLink) return alert('Please provide a valid Amazon link')
        try {
          setIsLoading(true);
          const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    
  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12">
      <input type="text" value={searchPrompt} 
      onChange={(e)=> setSearchPrompt(e.target.value)}
      className='searchbar-input'  placeholder='enter product link'/>
      <button type='submit' className='searchbar-btn' disabled={searchPrompt===''}> {isLoading ? 'Searching...' : 'Search' }
      </button>
    </form>

  )
}

export default Searchbar