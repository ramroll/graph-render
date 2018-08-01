import 'babel-polyfill'
import merge_sort_tree from './pages/merge-sort-tree'
import qs from 'qs'


const pathname = location.pathname
const query = qs.parse( location.search.substr(1) )


if(pathname === '/merge-sort-tree') {
  merge_sort_tree({query})
}