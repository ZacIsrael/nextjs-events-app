import classes from './event-summary.module.css';

function EventSummary(props) {
  console.log('EventSummary(): props= ', props)
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;