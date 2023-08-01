const bodymodel = require('../models/bodytype_model')


const addBodyType = async (req, res) => {
  try {
    const formerror = {};
    if (req.body.body_type === undefined) {
      formerror.body_type = "body_type is required";
    }
    if (Object.keys(formerror).length !== 0) {
      return res.send(formerror);
    }
    const getBody = {
        body_type: req.body.body_type,
        body_slug: req.body.body_type.toLowerCase().replace(/ /g, "-"),
    };

    const existingbody_slug = await bodymodel.findOne({
        body_type: getBody.body_type,
        body_slug: getBody.body_slug,
    });

    if (existingbody_slug) {
      return res.send( `slug already added`);
    }
    const bodytypes = new bodymodel(getBody);
    await bodytypes.save();
    res.send(bodytypes);
  } catch (error) {
    res.send(error);
  }
}


const update_body = async (req, res) => {
    try {
      const bodytypes = await bodymodel.findById(req.params.id);
  
      if (req.body.body_type) {
        bodytypes.body_type = req.body.body_type;
      }
      if (req.body.body_slug) {
        bodytypes.body_slug = req.body.body_slug.toLowerCase().replace(/ /g, "-");
      } else {
        bodytypes.body_slug;
      }
      await bodytypes.save();
      res.send(`${bodytypes} is updated succussfully`);
    } catch (error) {
      return res.send(error);
    }
  };


  const readAllBodyTypes = async (req, res) => {
    try {
      const bodytypes = await bodymodel.find();
      if (!bodytypes) {
        return res.send("No body type found");
      }
      res.send(bodytypes);
    } catch (error) {
      re.send("Something went wrong");
    }
  };


  const readBodyById = async (req, res) => {
    try {
      const bodytypes = await bodymodel.findById(req.params.id);
      if (!bodytypes) {
        return res.send("Body type not found");
      }
      res.send(bodytypes);
    } catch (error) {
      res.send("Something went wrong or type not found");
    }
  };




  const inactiveBodyType = async(req,res)=>{
    try{
        const bodytypes = await bodymodel.findById(req.params.id)
        if(!bodytypes)
        {
          return res.send("bodytypes not found")
        }
        bodytypes.status = req.body.status
        let statusType = ''
        if(bodytypes.status === 1)
        {
         statusType = "Active"
        }
        else if(bodytypes.status === 2)
        {
          statusType = "Inactive"
        }

        await bodytypes.save()
        res.send(statusType)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}




module.exports = {addBodyType,update_body,readAllBodyTypes,readBodyById,inactiveBodyType}