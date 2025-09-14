#find frontend -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from[[:space:]]\x27react-router\x27/from '\''react-router-dom'\''/g'


find frontend -type f -name "*.js" -o -name "*.jsx" | xargs sed -i "s/from 'react-router-dom'/from 'react-router'/g"