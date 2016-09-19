//
//  ShowDetailViewController.swift
//  NextTime
//
//  Created by Nikhil on 9/19/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import UIKit

class ShowDetailViewController: UIViewController {

    var item = Item();
    weak var parentViewControl : MainTableViewController?
    
    @IBOutlet weak var profileImageView: UIImageView!
    
    @IBOutlet weak var overlayView: UIView!
    @IBOutlet weak var scrollView: UIScrollView!
    
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var lastDone: UILabel!
    @IBOutlet weak var lastDoneVal: UILabel!
    
    @IBOutlet weak var nextDateVal: UILabel!
    @IBOutlet weak var nextDate: UILabel!
    
    @IBOutlet weak var countVal: UILabel!
    @IBOutlet weak var count: UILabel!
    
    @IBOutlet weak var taskDetail: UILabel!
    
    @IBOutlet weak var pastOccurences: UILabel!
    
    @IBAction func editTask(sender: AnyObject) {
        performSegueWithIdentifier("editTask", sender: self)
        
    }
    
    func reloadView(){
        self.nameLabel.text = item.taskName;
        self.countVal.text = String(item.getCount());
        self.lastDoneVal.text = item.getDateInLocalWithoutTime(item.lastDone);
        self.nextDateVal.text = item.getDateInLocalWithoutTime(item.nextPrediction);
        self.taskDetail.text = item.detail;
        self.profileImageView.image = item.image;
    }
    
    func editItem(oldTaskName: String, item: Item) {
        
        parentViewControl!.editItem(oldTaskName, item: item)
        self.item = item;
        reloadView();
    }
    
    // MARK: - Navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "editTask" {
            
            let secondViewController = segue.destinationViewController as! AddViewController
            
            secondViewController.imageDefault = item.image;
            secondViewController.nameDefaultValue = item.taskName;
            secondViewController.detailDefaultValue = item.detail;
            secondViewController.lastDoneDefaultValue = item.lastDone;
            secondViewController.mode = "edit"
            
            secondViewController.parentViewControllerLol = self
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let rightButton = UIBarButtonItem(title: "Edit", style: UIBarButtonItemStyle.Plain, target: self, action: #selector(ShowDetailViewController.editTask(_:)))
        
        navigationItem.rightBarButtonItem = rightButton


        //UIColor* mainColor = [UIColor colorWithRed:28.0/255 green:158.0/255 blue:121.0/255 alpha:1.0f];
        //UIColor* imageBorderColor = [UIColor colorWithRed:28.0/255 green:158.0/255 blue:121.0/255 alpha:0.4f];
        
        let mainColor = UIColor(red:28.0/255, green:158.0/255, blue:121.0/255, alpha:1.0)
        let imageBorderColor = UIColor(red:28.0/255, green:158.0/255, blue:121.0/255, alpha:0.4)

        var fontName = "Avenir-Book";
        var boldItalicFontName = "Avenir-BlackOblique";
        var boldFontName = "Avenir-Black";
        
        self.nameLabel.textColor =  mainColor;
        self.nameLabel.font =  UIFont(name: boldItalicFontName, size:18.0);
        self.nameLabel.text = item.taskName;
        
        self.countVal.font = UIFont(name: boldItalicFontName, size:20.0);
        self.countVal.textColor = mainColor;
        self.countVal.text = String(item.getCount());
        
        self.lastDoneVal.font = UIFont(name: boldItalicFontName, size:14.0);
        self.lastDoneVal.textColor = mainColor;
        self.lastDoneVal.text = item.getDateInLocalWithoutTime(item.lastDone);
        
        self.nextDateVal.font = UIFont(name: boldItalicFontName, size:14.0);
        self.nextDateVal.textColor = UIColor.purpleColor();
        self.nextDateVal.text = item.getDateInLocalWithoutTime(item.nextPrediction);
        
        self.taskDetail.font = UIFont(name: fontName, size:12.0);
        self.taskDetail.textColor = UIColor.darkGrayColor();
        self.taskDetail.text = item.detail;
        
        /*
        self.followerCountLabel.textColor =  countColor;
        self.followerCountLabel.font =  countLabelFont;
        self.followerCountLabel.text = @"132k";
        
        self.followingCountLabel.textColor =  countColor;
        self.followingCountLabel.font =  countLabelFont;
        self.followingCountLabel.text = @"200";
        
        self.updateCountLabel.textColor =  countColor;
        self.updateCountLabel.font =  countLabelFont;
        self.updateCountLabel.text = @"20k";
        
        UIFont* socialFont = [UIFont fontWithName:boldItalicFontName size:10.0f];
        
        self.followerLabel.textColor =  mainColor;
        self.followerLabel.font =  socialFont;
        self.followerLabel.text = @"FOLLOWERS";
        
        self.followingLabel.textColor =  mainColor;
        self.followingLabel.font =  socialFont;
        self.followingLabel.text = @"FOLLOWING";
        
        self.updateLabel.textColor =  mainColor;
        self.updateLabel.font =  socialFont;
        self.updateLabel.text = @"UPDATES";
        
        
        self.bioLabel.textColor =  mainColor;
        self.bioLabel.font =  [UIFont fontWithName:fontName size:14.0f];
        self.bioLabel.text = @"Founder, CEO of Mavin Records, Entrepreneur mom and action gal";
        
        self.friendLabel.textColor =  mainColor;
        self.friendLabel.font =  [UIFont fontWithName:boldFontName size:18.0f];;
        self.friendLabel.text = @"Friends";
        */
        
        self.profileImageView.image = item.image;
        self.profileImageView.contentMode = .ScaleAspectFill;
        self.profileImageView.clipsToBounds = true;
        self.profileImageView.layer.borderWidth = 4.0;
        self.profileImageView.layer.cornerRadius = 55.0;
        self.profileImageView.layer.borderColor = imageBorderColor.CGColor;
        
        self.taskDetail.layer.borderColor = UIColor.whiteColor().CGColor;
        self.taskDetail.layer.borderWidth = 4.0;
        self.taskDetail.layer.cornerRadius = 5.0;
        
        /*self.friendContainer.layer.borderColor = [UIColor whiteColor].CGColor;
        self.friendContainer.layer.borderWidth = 4.0f;
        self.friendContainer.clipsToBounds = YES;
        self.friendContainer.layer.cornerRadius = 5.0f;*/
        
        /*[self styleFriendProfileImage:self.friendImageView1 withImageNamed:@"profile-1.jpg" andColor:imageBorderColor];
        [self styleFriendProfileImage:self.friendImageView2 withImageNamed:@"profile-2.jpg" andColor:imageBorderColor];
        [self styleFriendProfileImage:self.friendImageView3 withImageNamed:@"profile-3.jpg" andColor:imageBorderColor];*/
        
        addDividerToView(self.scrollView, location: 230)
        //addDividerToView(self.scrollView, location: 300)
        //addDividerToView(self.scrollView, location: 370)

        self.scrollView.contentSize = CGSizeMake(320, 590);
        self.scrollView.backgroundColor = UIColor.whiteColor();
    }
    
    /*-(void)styleFriendProfileImage:(UIImageView*)imageView withImageNamed:(NSString*)imageName andColor:(UIColor*)color{
    
    imageView.image = [UIImage imageNamed:imageName];
    imageView.contentMode = UIViewContentModeScaleAspectFill;
    imageView.clipsToBounds = YES;
    imageView.layer.borderWidth = 4.0f;
    imageView.layer.borderColor = color.CGColor;
    imageView.layer.cornerRadius = 35.0f;
    }
    
    -(void)addDividerToView:(UIView*)view atLocation:(CGFloat)location{
    
    UIView* divider = [[UIView alloc] initWithFrame:CGRectMake(20, location, 280, 1)];
    divider.backgroundColor = [UIColor colorWithWhite:0.9f alpha:0.7f];
    [view addSubview:divider];
    }*/

    func addDividerToView(view: UIScrollView, location: CGFloat){
        
        let screenSize: CGRect = UIScreen.mainScreen().bounds
        let screenWidth = screenSize.width
        
        let divider = UIView(frame: CGRectMake(20, location, screenWidth - 40, 1))
        divider.backgroundColor = UIColor(white:0.9, alpha:0.7);
        
        view.addSubview(divider)
    }

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
