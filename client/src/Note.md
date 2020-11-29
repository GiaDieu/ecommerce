# Important Note - React-Router-Dom

### Query-string and query-parameters

With v4, react-router no longer fully supports query-string like previous versions, in most cases you should use query-parameters, assuming you have a router:

```JS
 <Route path="/detail/:id" component={Detail} />
  // ==> props.match.params.id
```

If you try to pass the query-string during navigation, say

```JS
props.history.push('/detail/?id=14')
  // ==> props.location.search = '?id=14'
```

Result : As such we will need a transformation to get the desired data, this method is not really optimal.
