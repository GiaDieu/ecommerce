#### Important Note - React-Router-Dom

#### 1. Query-string and query-parameters

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

#### 2. Async=true in Script Javascript

#### The async attribute is a boolean attribute.

#### When present, it specifies that the script will be executed asynchronously as soon as it is available.

> Note: The async attribute is only for external scripts (and should only be used if the src attribute is present).

> Note: There are several ways an external script can be executed:

- If async is present: The script is executed asynchronously with the rest of the page (the script will be executed while the page continues the parsing)
- If async is not present and defer is present: The script is executed when the page has finished parsing
- If neither async or defer is present: The script is fetched and executed immediately, before the browser continues parsing the page

#### 3. onLoad Javascript Handler

onload is most often used within the <body> element to execute a script once a web page has completely loaded all content (including images, script files, CSS files, etc.).
