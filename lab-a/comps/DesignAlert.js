const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
  }
  
export default function DesignAlert(props) {
    return (
        <div style={layoutStyle}>        
            {props.children}
        </div>
    )
}