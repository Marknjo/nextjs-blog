# :rocket: Fetching Data in NextJs Apps

This section was all about fetching data in NextJs Apps. There are essentially 2 approaches to these:

1. Server side pre-redenring - special async functions are provided by the NextJs
   i. export async function getStaticProps(context){...} -> context return {params}
   ii. export async function getStaticParams(context){...} -> context return {params}
   iii. export async function getServerSideProps(context){...} -> context return {params, req, res}
2. Client side data fetching - the normal react way of fetching data. The problem is, data will not be pre-rendered in the browser.
3. Hybrid of the two - combining the server-side pre-rendering and the client side data fetching.

## :balloon: Skills Gained in the Session

- How to efficiently use the three server side pre-rendering methods - Technically, getServerSideProps(), is used when the data is generated on the fly on the server side when user requests. For the other two, the data is generated on the build time.
- For the getStaticParams(), the method is only needed when accessing dynamic routes. This is because next need to knwo which exact routes need to be rendered. When just accessing normal routes, it is never needed. This is because only fetching is done during this time.
- The code written withing the three methods, are purely NodeJs and JavaScript. This code recides on the server side only. It's not client. Therefore, you can't write React code here.
- One thing to note, the export for the getStatics, come before the export of the page. While the getServer, it comes after.
- These methods can only be used on the pages components. They do not ship to the client side as they are extracted during the build time.
- We need pre-rendering to pre-populate the dat to the client so that the source page can be view as the use see its. This is important for SEO. Normal, React way of fetching, the data is empty.
- The nextJs has a nifty useSWR hook which does fetching of data super easy. It also has a tone of benefits. See [SWR](https://swr.vercel.app/){:target="\_blank"}.

## :bookmark_tabs: Footnotes

This section was one of those in depth sections. It may need a second pass to fully understand everything and every nifty usage of the three methods.
