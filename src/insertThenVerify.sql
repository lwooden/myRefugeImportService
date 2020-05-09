INSERT INTO passages (passage_text,passage_loc,category_id) VALUES ('Pride goes before destruction,
And a haughty spirit before a fall.','Proverbs 16:18',1);

INSERT INTO passages (passage_text,passage_loc,category_id) VALUES ('The fear of the Lord is to hate evil;
Pride and arrogance and the evil way And the perverse mouth I hate.','Proverbs 18:13',1);

INSERT INTO categories (category_name) VALUES ('Lust');




SELECT * FROM passages WHERE category_id=1
