import classes from './comment-list.module.css';

function CommentList(props) {
  console.log('CommentList: props= ', props)
  console.log('props.items= ', props.items)
  console.log('props.items[0]= ', props.items[0])

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {props.items.map(item => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ) )}
    </ul>
  );
}

export default CommentList;
