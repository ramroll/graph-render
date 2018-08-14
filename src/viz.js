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
  case '/sort-viz' :
    sortViz()
    break
}