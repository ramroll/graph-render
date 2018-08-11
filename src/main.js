import 'babel-polyfill'
import merge_sort_tree from './pages/merge-sort-tree'
import arrays from './pages/arrays'
import qs from 'qs'


const pathname = location.pathname
const query = qs.parse( location.search.substr(1) )


switch(pathname) {
  case '/merge-sort-tree' :
    merge_sort_tree({ query })
    break
  case '/arrays' :
    arrays()
    break
}