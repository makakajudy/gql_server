
/* Subscriptions are a GraphQL feature that allows a server to send data
 to its clients when a specific event happens.
 eg when a new Link element is created or
 when an existing Link element is upvoted  all in real time*/

function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")//
    //asyncIterator() is used by the GraphQL server to push the event data to the client.
  }
  
  const newLink = {
    //subscribe field=> Subscription resolvers inside an object
    //resolve field =>return data emitted by the AsyncIterator
    subscribe: newLinkSubscribe,
    resolve: payload => {
      return payload
    },
  }

  function newVoteSubscribe(parent, args, context, info) {
    //PubSub instance enables your asyncIterator()/server code to both 
    //publish newlink/events to a particular user/label and 
    //listen for events associated with a particular label
    return context.pubsub.asyncIterator("NEW_VOTE")
  }
  
  const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
      return payload
    },
  }
  
  module.exports = {
    newLink,
    newVote,
  }