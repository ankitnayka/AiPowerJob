import multer from 'multer'




const upload2 = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('companylogo');


export { upload2}