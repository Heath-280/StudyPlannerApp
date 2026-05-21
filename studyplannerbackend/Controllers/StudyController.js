import Study from "../models/Study.js";

// ================= GET STUDIES =================

const getStudy = async (req, res) => {

    try {

        const studies = await Study.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            studies

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message: error.message

        });

    }

};

// ================= CREATE STUDY =================

const createdStudy = async (req, res) => {

    try {

        const {

            title,

            description,

            duration,

            dueDate,

            priority

        } = req.body;

        // Validation

        if (

            !title ||

            !description ||

            duration === undefined ||

            !dueDate

        ) {

            return res.status(400).json({

                message:
                "All fields are required"

            });

        }

        // Create Study

        const newStudy =
            await Study.create({

                title,

                description,

                duration,

                dueDate,

                priority,

                user: req.user.id

            });

        return res.status(201).json({

            message:
            "Study created successfully",

            study: newStudy

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message: error.message

        });

    }

};

// ================= UPDATE STUDY =================

const updateStudy = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            title,

            description,

            duration,

            completed,

            dueDate,

            priority

        } = req.body;

        // Find Study

        const study =
            await Study.findById(id);

        if (!study) {

            return res.status(404).json({

                message:
                "Study not found"

            });

        }

        // Authorization Check

        if (

            study.user.toString()
            !== req.user.id

        ) {

            return res.status(401).json({

                message:
                "Unauthorized"

            });

        }

        // Update Study

        const updatedStudy =
            await Study.findByIdAndUpdate(

                id,

                {

                    title,

                    description,

                    duration,

                    completed,

                    dueDate,

                    priority

                },

                {

                    new: true

                }

            );

        return res.status(200).json({

            message:
            "Study updated successfully",

            updatedStudy

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message: error.message

        });

    }

};

// ================= DELETE STUDY =================

const deletedStudy = async (req, res) => {

    try {

        const study =
            await Study.findById(
                req.params.id
            );

        if (!study) {

            return res.status(404).json({

                message:
                "Study not found"

            });

        }

        // Authorization Check

        if (

            study.user.toString()
            !== req.user.id

        ) {

            return res.status(401).json({

                message:
                "Unauthorized"

            });

        }

        // Delete Study

        await Study.findByIdAndDelete(
            req.params.id
        );

        return res.status(200).json({

            message:
            "Study deleted successfully"

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message: error.message

        });

    }

};

export {

    createdStudy,

    getStudy,

    updateStudy,

    deletedStudy

};