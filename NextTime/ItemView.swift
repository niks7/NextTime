//
//  ItemView.swift
//  NextTime
//
//  Created by Shlok Kapoor on 18/09/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import UIKit

class ItemView: UITableViewCell {
    
    var onButtonTapped : (() -> Void)? = nil
    
    @IBOutlet weak var taskName: UILabel!
    @IBOutlet weak var lastTime: UILabel!
    @IBOutlet weak var nextTime: UILabel!
    @IBOutlet weak var count: UILabel!
    
    @IBAction func DoTask(sender: AnyObject) {
        
        if let onButtonTapped = self.onButtonTapped {
            onButtonTapped()
        }
        
    }
    
    
    
}
