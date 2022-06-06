
/* Subscriptions are a GraphQL feature that allows a server to send data
 to its clients when a specific event happens.
 eg when a new Link element is created or
 when an existing Link element is upvoted  all in real time*/

function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
  }
  
  const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
      return payload
    },
  }

  function newVoteSubscribe(parent, args, context, info) {
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