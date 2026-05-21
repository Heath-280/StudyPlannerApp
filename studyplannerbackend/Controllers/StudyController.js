import Study from "../models/Study.js";

const getStudy = async (req,res) => {
    try{
        const studies = await Study.find({
            user:req.user.id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            studies
        });
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const createdStudy = async (req,res) => {
    try{
        const {title,description,duration} = req.body;

        if(!title || !description || !duration){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newStudy = await Study.create({
            title,
            description,
            duration,
            user: req.user.id
        });

        return res.status(201).json({
            message: "User created Successfully",
            study: newStudy
        });
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


const updateStudy = async (req,res) => {
    try{
        const {id} = req.params;
        const {title,description,duration,completed} = req.body;

        const study = await Study.findById(id);

        if(!study){
            return res.status(404).json({
                message: "Study Not Found"
            });
        }

        if (study.user.toString() !== req.user.id){
            return res.status(401).json({
                message:"Unauthorized"
            })
        };

        const updatedStudy = await Study.findByIdAndUpdate(id,{
            title,description,duration,completed
        },{new:true});

        return res.status(200).json({
            message:"User updated successfully",
            updateStudy
        });
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
};


const deletedStudy = async (req, res) => {

  try {

    const deletedStudy =
      await Study.findByIdAndDelete(
        req.params.id
      );

    if (!deletedStudy) {

      return res.status(404).json({
        message: "Study not found"
      });

    }

    return res.status(200).json({
      message: "Study deleted successfully"
    });

  }

  catch (error) {

    return res.status(500).json({
      message: "Server Error"
    });

  }

};

export {createdStudy,getStudy,updateStudy,deletedStudy};