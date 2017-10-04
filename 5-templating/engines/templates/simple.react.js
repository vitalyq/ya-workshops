const React = require('react');

module.exports = function colors(props) {
  return (
    <div>
      <h1>{props.header}</h1>
      <ul>
        {props.items.map(i =>
          i.current ?
            <li><strong>{i.name}</strong></li> :
            <li><a href={i.url}>{i.name}</a></li>
        )}
      </ul>
    </div>
  );
}
