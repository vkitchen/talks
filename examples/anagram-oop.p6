sub anagramsFor ($word, @possible) {
    my $sword = $word.comb.sort.join;
    my @out;
    for @possible -> $s {
        if $sword eq $s.comb.sort.join {
            @out.append: $s;
        }
    }
    return @out;
}

say anagramsFor "allergy", ["gallery", "ballerina", "regally"
                            , "clergy", "largely", "leading"];
