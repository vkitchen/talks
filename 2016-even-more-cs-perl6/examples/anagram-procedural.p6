sub anagramsFor ($word, @possible) {
    my $sword = join '', sort split '', $word;
    my @out;
    for @possible -> $s {
        if $sword eq join('', sort(split('', $s))) {
            append(@out, $s);
        }
    }
    return @out;
}

say anagramsFor "allergy", ["gallery", "ballerina", "regally"
                            , "clergy", "largely", "leading"];
