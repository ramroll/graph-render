import 'babel-polyfill'
import merge_sort_tree from './pages/merge-sort-tree'
import bsearch from './pages/bsearch'
import insert from './pages/insert'
import insertionSort from './pages/insertion-sort'
import sortViz from './pages/sort-viz'
import qs from 'qs'


const pathname = location.pathname
const query = qs.parse( location.search.substr(1) )


switch(pathname) {
  case '/merge-sort-tree' :
    merge_sort_tree({ query })
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
  case '/sort-viz' : 
    sortViz()
    break
}