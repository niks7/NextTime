//
//  DetailViewController.swift
//  NextTime
//
//  Created by Nikhil on 9/19/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {
    
    var item = Item();

    override func viewDidLoad() {
        super.viewDidLoad()
        self.taskName.text = item.taskName;
    }

    @IBOutlet weak var taskName: UILabel!
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
