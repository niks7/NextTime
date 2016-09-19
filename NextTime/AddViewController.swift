//
//  AddViewController.swift
//  NextTime
//
//  Created by Nikhil on 9/19/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import UIKit

import Eureka

class AddViewController: FormViewController {
    
    weak var parentViewControllerLol : UIViewController?
    
    var mode = "Add"

    var namePlaceHolder = "Enter name here";
    var detailPlaceHolder = "And some detail about the task";
    
    var nameDefaultValue = "";
    var detailDefaultValue = "";
    var weekendsDefaultValue = true;
    var lastDoneDefaultValue = NSDate();
    var imageDefault = UIImage();
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //Navigation bar init
        
        self.title = "Add Task"
        
        let rightButton = UIBarButtonItem(title: "Save", style: UIBarButtonItemStyle.Plain, target: self, action: #selector(AddViewController.saveButton(_:)))
        
        navigationItem.rightBarButtonItem = rightButton
        
        //form init
        form
            +++ Section("Picture")
            <<< ImageRow("image"){ row in
                row.title = "Click to select task picture"
                row.value = imageDefault
            }
            
            +++ Section("Details")
            <<< NameRow("name"){ row in
                row.title = "Name"
                row.placeholder = namePlaceHolder
                row.value = nameDefaultValue
            }
            <<< TextRow("detail"){
                $0.title = "Detail"
                $0.placeholder = detailPlaceHolder
                $0.value = detailDefaultValue
            }
            
            +++ Section(header: "Settings", footer: "A task needs atleast history of 10 occurences for prediction to work")
            <<< SwitchRow("occursOnWeekends"){
                $0.title = "Occurs on Weekends?"
                $0.value = weekendsDefaultValue
            }
            <<< DateRow("lastDone"){
                $0.title = "Last Occurence"
                $0.value = lastDoneDefaultValue
            }
    }
    
    override func viewWillAppear(animated: Bool) {
        self.navigationController?.toolbarHidden = true;
    }
     
    override func viewDidDisappear(animated: Bool) {
        self.navigationController?.toolbarHidden = false;
    }
    
    func validateValues(form: Eureka.Form) -> Bool {
        
        let valuesDictionary = form.values();
        let taskName = valuesDictionary["name"] as? String;
        
        if(taskName == nil || taskName!.characters.count == 0)
        {
            return false;
        }
        
        return true;
    }
    
    func showError(message: String){
        
        let refreshAlert = UIAlertController(title: "Error", message: message, preferredStyle: UIAlertControllerStyle.Alert)
        
        refreshAlert.addAction(UIAlertAction(title: "Gotcha", style: .Default, handler: { (action: UIAlertAction!) in
        }))
        
        presentViewController(refreshAlert, animated: true, completion: nil)
    }
    
    @IBAction func saveButton(sender: AnyObject) {
        
        let valuesDictionary = form.values();
        
        //validate values
        if(!validateValues(form)){
            showError("Please enter a task name");
            return;
        }
        
        //prepare new item
        let taskDetail = valuesDictionary["detail"] as! String;
        let taskName = valuesDictionary["name"] as! String;
        let lastDone = valuesDictionary["lastDone"] as! NSDate;
        let image = valuesDictionary["image"] as! UIImage;
        
        let newItem = Item(name: taskName, detail: taskDetail, lastDone: lastDone, image: image)
        
        //save new item
        if(mode == "Add"){
            let parentViewController = parentViewControllerLol as! MainTableViewController
            parentViewController.saveItem(newItem)
        }
        else{
            let parentViewController = parentViewControllerLol as! ShowDetailViewController
            parentViewController.editItem(nameDefaultValue, item: newItem)
        }
        
        //go back to parent controller
        navigationController!.popViewControllerAnimated(true)
    }

    
    
}
