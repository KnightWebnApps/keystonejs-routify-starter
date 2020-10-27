import { ApolloClient } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client'
import { endpoint } from './utils'

const cache = new InMemoryCache()

export const initClient = () => {

  const token = localStorage.getItem('token') || null;
  
  if(token === null){

    const client = new ApolloClient({
      uri: endpoint,
      cache,
      headers: {
        "Content-Type": "application/json"
      }
    });

    return client;
  }else{

    const client = new ApolloClient({
      uri: endpoint,
      cache,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });

    return client;
  }
}

