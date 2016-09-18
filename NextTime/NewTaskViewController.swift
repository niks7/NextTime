//
//  NewTaskViewController.swift
//  NextTime
//
//  Created by Shlok Kapoor on 18/09/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import UIKit

class NewTaskViewController: UIViewController
{
    @IBOutlet weak var taskName: UITextField!
    @IBOutlet weak var isScheduled: UISwitch!
    
    weak var parentViewControllerLol : MainTableViewController?

    @IBAction func backButton(sender: AnyObject) {
        
        //dismissViewControllerAnimated(true, completion: nil)
        navigationController!.popViewControllerAnimated(true)
    }
    
    @IBAction func saveButton(sender: UIButton) {
        let item1 = Item(name: taskName.text!, last: NSDate(), next: NSDate(), history: [NSDate]())
        
        parentViewControllerLol!.saveItem(item1)
        
        navigationController!.popViewControllerAnimated(true)
        
        //dismissViewControllerAnimated(true, completion: nil)
    }
}
