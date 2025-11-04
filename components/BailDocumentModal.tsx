import React, { useState, useEffect } from 'react';

// This tells TypeScript that the jspdf library is available globally,
// since we've included it via a <script> tag in index.html.
declare const jspdf: any;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormState = {
    courtName: '',
    caseNo: '',
    defendantName: '',
    defendantAge: '',
    defendantFatherName: '',
    defendantAddress: '',
    firNo: '',
    policeStation: '',
    offences: '',
    suretyName: '',
    suretyAddress: '',
    suretyRelationship: '',
    groundsForBail: '',
};

const BailDocumentModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
        }
    }, [isOpen]);

    useEffect(() => {
        const { groundsForBail, ...requiredFields } = formData;
        // Fix: Check if field is a string before calling .trim() to resolve TypeScript error.
        const allFieldsFilled = Object.values(requiredFields).every(field => typeof field === 'string' && field.trim() !== '');
        setIsFormValid(allFieldsFilled);
    }, [formData]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGeneratePdf = () => {
        if (!isFormValid) {
            alert("Please fill in all required fields before generating the PDF.");
            return;
        }

        const { jsPDF } = jspdf;
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - margin * 2;
        let y = 20;
        
        // Helper function
        const addText = (text: string, size: number, options: any = {}, yOffset = 10) => {
            doc.setFontSize(size);
            doc.text(text, options.align === 'center' ? pageWidth / 2 : margin, y, options);
            y += yOffset;
        };

        addText("BAIL APPLICATION", 18, { align: 'center' });
        addText("Under Section 437 of the Code of Criminal Procedure, 1973", 10, { align: 'center' }, 15);
        
        addText(`IN THE COURT OF ${formData.courtName.toUpperCase()}`, 12);
        addText(`Case No.: ${formData.caseNo}`, 12, {}, 15);

        addText("Applicant/Defendant:", 12, { fontStyle: 'bold' });
        addText(`${formData.defendantName}, Age: ${formData.defendantAge}, S/o ${formData.defendantFatherName}, residing at ${formData.defendantAddress}.`, 11, {}, 15);

        addText("Versus", 12, { align: 'center' }, 15);

        addText("The State", 12, { fontStyle: 'bold' });
        addText(`Through ${formData.policeStation} Police Station`, 11, {}, 15);

        addText(`Subject: Application for bail in FIR No. ${formData.firNo}, under sections ${formData.offences}.`, 11, {}, 15);

        addText("May it please Your Honour,", 11, {}, 15);

        const grounds = doc.splitTextToSize(`The Applicant/Defendant named above respectfully submits as under: \n\n1. That the applicant has been falsely implicated in the above-noted case and is innocent. \n2. That the investigation in the case is complete and the applicant is no longer required for custodial interrogation. \n3. That the applicant has permanent roots in society and there is no chance of them absconding from the course of justice. \n4. Additional grounds: ${formData.groundsForBail || 'N/A'}`, contentWidth);
        doc.setFontSize(11);
        doc.text(grounds, margin, y);
        y += grounds.length * 5 + 10;

        addText("PRAYER:", 12, { fontStyle: 'bold' });
        const prayer = doc.splitTextToSize(`It is, therefore, most respectfully prayed that this Hon'ble Court may be pleased to grant bail to the applicant/defendant in the interest of justice. The applicant is ready to furnish a reliable surety of ${formData.suretyName}, residing at ${formData.suretyAddress} (${formData.suretyRelationship}) and undertakes to abide by any conditions imposed by this Hon'ble Court.`, contentWidth);
        doc.setFontSize(11);
        doc.text(prayer, margin, y);
        y += prayer.length * 5 + 20;

        doc.text("Applicant/Defendant", margin, y);
        doc.text("Through Counsel", pageWidth - margin, y, { align: 'right' });
        y += 5;
        doc.text(`(${formData.defendantName})`, margin, y);

        doc.save("Bail_Application.pdf");
    };

    if (!isOpen) return null;

    const inputClass = "w-full bg-slate-100 border border-slate-300 text-slate-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelClass = "block text-slate-700 text-sm font-bold mb-2";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Bail Document Preparation</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
                <fieldset className="border border-slate-300 p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-slate-700">Court & Case Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass} htmlFor="courtName">Court Name</label>
                            <input className={inputClass} id="courtName" name="courtName" type="text" value={formData.courtName} onChange={handleChange} placeholder="e.g., District Court, Chennai" />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="caseNo">Case/Application No.</label>
                            <input className={inputClass} id="caseNo" name="caseNo" type="text" value={formData.caseNo} onChange={handleChange} placeholder="e.g., Crl.M.P. No. 123/2024" />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border border-slate-300 p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-slate-700">Defendant's Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <input className={inputClass} name="defendantName" placeholder="Full Name" value={formData.defendantName} onChange={handleChange} />
                         <input className={inputClass} name="defendantAge" placeholder="Age" type="number" value={formData.defendantAge} onChange={handleChange} />
                         <input className={inputClass} name="defendantFatherName" placeholder="Father's Name" value={formData.defendantFatherName} onChange={handleChange} />
                    </div>
                    <div className="mt-4">
                        <textarea className={`${inputClass} resize-y`} name="defendantAddress" placeholder="Full Residential Address" value={formData.defendantAddress} onChange={handleChange} rows={2}></textarea>
                    </div>
                </fieldset>

                <fieldset className="border border-slate-300 p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-slate-700">FIR Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <input className={inputClass} name="firNo" placeholder="FIR No. and Year" value={formData.firNo} onChange={handleChange} />
                         <input className={inputClass} name="policeStation" placeholder="Police Station" value={formData.policeStation} onChange={handleChange} />
                         <input className={inputClass} name="offences" placeholder="Offences (e.g., 302 IPC)" value={formData.offences} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset className="border border-slate-300 p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-slate-700">Surety Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <input className={inputClass} name="suretyName" placeholder="Surety's Full Name" value={formData.suretyName} onChange={handleChange} />
                         <input className={inputClass} name="suretyRelationship" placeholder="Relationship to Defendant" value={formData.suretyRelationship} onChange={handleChange} />
                    </div>
                    <div className="mt-4">
                        <textarea className={`${inputClass} resize-y`} name="suretyAddress" placeholder="Surety's Full Address" value={formData.suretyAddress} onChange={handleChange} rows={2}></textarea>
                    </div>
                </fieldset>

                <fieldset className="border border-slate-300 p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-slate-700">Grounds for Bail</legend>
                    <textarea className={`${inputClass} resize-y`} name="groundsForBail" placeholder="Briefly state any additional reasons for seeking bail (optional)." value={formData.groundsForBail} onChange={handleChange} rows={4}></textarea>
                </fieldset>

            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
                <button
                    onClick={handleGeneratePdf}
                    disabled={!isFormValid}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isFormValid ? "Generate & Download PDF" : "Please Fill All Required Fields"}
                </button>
            </div>
        </div>
    </div>
  );
};

export default BailDocumentModal;