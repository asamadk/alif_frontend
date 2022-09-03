// import React from 'react'
// import * as Constants from '../Helper/Constants'
// import Box from '@mui/material/Box';

// export default function CustomSize(anchor) {

//     const [responseJSON,setresponseJSON] = React.useState({});
//     const [leftDrawer, setLeftDrawer] = React.useState({
//         left: false,
//         right: false,
//       });


//       const handlePopulateResponse = (event,type,id) => {

//         if(type === 'bodyType'){
//             delete responseJSON.genericsize
//             responseJSON.custom = true;
//             responseJSON.bodyType = event.target.id
//             if(id != null){
//                 Constants.BODY_TYPE.forEach(type => {
//                     if(id === type.id){
//                         type.class = type.class + ' image_box-selected';
//                     }else{
//                         type.class = 'image_box';
//                     }
//                 })
//             }
//         }else if(type === 'ncSize'){
//             // delete responseJSON.genericsize
//             responseJSON.size = event.target.value;
//             responseJSON.custom = false;
//         }else if(type === 'shirtSize'){
//             delete responseJSON.genericsize
//             responseJSON.custom = true;
//             responseJSON.shirtSize = id;
//             if(id != null){
//                 Constants.SHIRT_SIZE.forEach(shirtSize => {
//                     if(shirtSize.size == id){
//                         shirtSize.class = 'highlight-cirlce';
//                     }else{
//                         shirtSize.class = 'unhighlight-cirlce';
//                     }
//                 })
//             }
//         }else if(type === 'shoulder'){
//             delete responseJSON.genericsize
//             responseJSON.shoulder = event.target.id
//             responseJSON.custom = true;
//             if(id != null){
//                 Constants.SHOULDER_TYPE.forEach(shoulder => {
//                     if(shoulder.id === id){
//                         shoulder.class = shoulder.class + ' image_box-selected';
//                     }else{
//                         shoulder.class = 'image_box';
//                     }
//                 })
//             }
//         }else if(type === 'height'){
//             delete responseJSON.genericsize
//             if(id === null)return;
//             responseJSON.custom = true;
//             responseJSON.height = id;
//             Constants.HEIGHT.forEach(height => {
//                 if(height.value === id){
//                     height.class = 'highlight-cirlce';
//                 }else{
//                     height.class = 'unhighlight-cirlce';
//                 }
//             })
//         }else if(type === 'fit'){
//             if(id === null)return;
//             delete responseJSON.genericsize
//             responseJSON.custom = true;
//             responseJSON.preferredFit = id;
//             Constants.PREFERRED_FIT.forEach(fit => {
//                 if(fit.id === id){
//                     fit.class = fit.class + ' image_box-selected';
//                 }else{
//                     fit.class = 'image_box';
//                 }
//             })
//             }
//         else if(type === 'genericsize'){
            
//             if(id === null)return;
//             responseJSON.custom = false;
//             responseJSON.genericsize = id;
//             Constants.GENERIC_SIZE.forEach(size => {
//                 if(size.size === id){
//                     size.class = 'highlight-cirlce';
//                 }else{
//                     size.class = 'unhighlight-cirlce';
//                 }
//             })
//             setAddedToCart(true)
//             setsizeSelected(true);
//             setErrorMsg('Size selected')
//             setTimeout(() => {
//                 setAddedToCart(false)
//             },1000)
//         }
//         console.log(responseJSON);
//         console.log(JSON.stringify(responseJSON));
//     }

//     const toggleDrawer = (anchor, open) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//           return;
//         }
//         setLeftDrawer({ ...leftDrawer, [anchor]: open });
//     };

//   return (
//     <Box
//           sx={{ width:  600 }}
//           role="presentation"
//           onClick={toggleDrawer(anchor, false)}
//           onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <h1>Your size</h1>
//             <div className='product_elm_name'>
//                 <p>Select Body Type</p>
                
//             </div>
//             <div className='product_elm_images'>
//                 {Constants.BODY_TYPE.map(body => {
//                     return(
//                         <div id={body.id} onClick={(event) => handlePopulateResponse(event,'bodyType',body.id)} className={body.class}>
//                             <img id={body.id} src={body.img} alt={body.name}></img>
//                             <p id={body.id}>{body.name}</p>
//                         </div>        
//                     )})
//                 }
//             </div>
//             <div className='product_elm_name'>
//                 <p>Select Shirt Size</p>
                
//             </div>
//             <div className="ProductDetails__Description_S_size_num">
//                 {Constants.SHIRT_SIZE.map(size => {
//                     return(
//                     <button className={size.class} value={size.size} onClick={(event) => handlePopulateResponse(event,'shirtSize',size.size)} >
//                         {size.size}
//                     </button>)
//                 })}
//             </div>
//             <div className='product_elm_name'>
//                 <p>Select Shoulder Type</p>
                
//             </div>
//             <div className='product_elm_images'>
//                 {
//                     Constants.SHOULDER_TYPE.map(shoulder => {
//                         return(
//                         <div id={shoulder.id} className={shoulder.class} onClick={(event) => handlePopulateResponse(event,'shoulder',shoulder.id)} >
//                             <img id={shoulder.id} src={shoulder.img} alt={shoulder.name}></img>
//                             <p id={shoulder.id} >{shoulder.name}</p>
//                         </div>
//                         )
//                     })
//                 }
//             </div>
//             <div className='product_elm_name'>
//                 <p>Select Height</p>
                
//             </div>
//             <div className="ProductDetails__Description_S_size_num">
//                 {Constants.HEIGHT.map(height => {
//                     return(
//                     <button onClick={(event) => handlePopulateResponse(event,'height',height.value)} className={height.class} >
//                         {height.value}
//                     </button>
//                     )
//                 })}
//             </div>
//             <div className='product_elm_name'>
//                 <p>Select Preferred Fit</p>
                
//             </div>
//             <div className='product_elm_images'>
//                 {Constants.PREFERRED_FIT.map(fit => {
//                     return(
//                         <div id={fit.id} className={fit.class} onClick={(event) => handlePopulateResponse(event,'fit',fit.id)} >
//                             <img id={fit.id} src={fit.img}></img>
//                             <p id={fit.id} >{fit.name}</p>
//                         </div>            
//                         )
//                     })
//                 }
//             </div>
//                 <div className='submit_Button_custom_size'>
//                     <LoadingButton onClick={handleCustomSize} variant="outlined">Submit</LoadingButton>
//                 </div>
//           <List>
//           </List>
//         </Box>
//   )
// }
