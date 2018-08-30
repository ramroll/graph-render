import 'babel-polyfill'
import merge_sort_tree from './pages/merge-sort-tree'
import bsearch from './pages/bsearch'
import insert from './pages/insert'
import insertionSort from './pages/insertion-sort'
import qs from 'qs'
import ntree from './pages/n-tree'

const pathname = location.pathname
const query = qs.parse( location.search.substr(1) )


switch(pathname) {
  case '/merge-sort-tree' :
    merge_sort_tree({ query })
    break
  case '/n-tree' :
    ntree({query})
    break
  case '/insert' :
    insert()
    break
  case '/insertion-sort' :
    insertionSort()
    break
  case '/bsearch' :
    bsearch()
    break

}